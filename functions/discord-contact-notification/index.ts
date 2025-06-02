import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Get Discord webhook URL from environment variables
const DISCORD_WEBHOOK_URL = Deno.env.get('DISCORD_WEBHOOK_URL');

if (!DISCORD_WEBHOOK_URL) {
    throw new Error('DISCORD_WEBHOOK_URL environment variable is required');
}

Deno.serve(async (req: Request) => {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { record } = await req.json();

        if (!record) {
            throw new Error('No record provided');
        }

        // Format the Discord embed message
        const discordMessage = {
            embeds: [
                {
                    title: "📩 Nouveau message de support - MWPLU",
                    color: 0x3b82f6, // Blue color
                    fields: [
                        {
                            name: "👤 Nom",
                            value: record.name || 'Non spécifié',
                            inline: true
                        },
                        {
                            name: "📧 Email",
                            value: record.email || 'Non spécifié',
                            inline: true
                        },
                        {
                            name: "📝 Sujet",
                            value: record.subject || 'Non spécifié',
                            inline: false
                        },
                        {
                            name: "💬 Message",
                            value: record.message || 'Aucun message',
                            inline: false
                        }
                    ],
                    timestamp: record.created_at || new Date().toISOString(),
                    footer: {
                        text: "MWPLU Support System",
                        icon_url: "https://cdn.discordapp.com/emojis/123456789.png" // Optional: replace with your logo
                    }
                }
            ]
        };

        // Send to Discord webhook
        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(discordMessage)
        });

        if (!discordResponse.ok) {
            const errorText = await discordResponse.text();
            console.error('Discord webhook error:', errorText);
            throw new Error(`Discord webhook failed: ${discordResponse.status}`);
        }

        console.log('Successfully sent contact form data to Discord');

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Contact form data sent to Discord successfully'
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        console.error('Error sending to Discord:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to send notification to Discord',
                details: error.message
            }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );
    }
}); 