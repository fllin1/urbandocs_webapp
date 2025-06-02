import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// You'll need to add your Stripe secret key to your environment variables
const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');

if (!STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

Deno.serve(async (req: Request) => {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { amount, currency = 'eur' } = await req.json();

        if (!amount || amount < 100) { // Minimum 1 euro
            return new Response(
                JSON.stringify({ error: 'Amount must be at least 1 euro' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            );
        }

        // Create Stripe checkout session
        const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'payment_method_types[0]': 'card',
                'line_items[0][price_data][currency]': currency,
                'line_items[0][price_data][product_data][name]': 'Don pour MWPLU',
                'line_items[0][price_data][product_data][description]': 'Soutien au développement de MWPLU',
                'line_items[0][price_data][unit_amount]': amount.toString(),
                'line_items[0][quantity]': '1',
                'mode': 'payment',
                'success_url': `${new URL(req.url).origin}/donation-success`,
                'cancel_url': `${new URL(req.url).origin}/info/donation`,
                'metadata[source]': 'mwplu_donation',
            }),
        });

        if (!stripeResponse.ok) {
            const errorText = await stripeResponse.text();
            console.error('Stripe error:', errorText);
            throw new Error('Failed to create Stripe checkout session');
        }

        const session = await stripeResponse.json();

        return new Response(
            JSON.stringify({ sessionId: session.id }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        console.error('Error creating donation session:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );
    }
}); 