import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const DISCORD_WEBHOOK_URL = Deno.env.get('DISCORD_WEBHOOK_URL');

if (!DISCORD_WEBHOOK_URL) {
    throw new Error('DISCORD_WEBHOOK_URL environment variable is required');
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // Create a test message
        const testMessage = {
            embeds: [
                {
                    title: "🧪 Test Discord Integration - MWPLU",
                    description: "Ceci est un test de l'intégration Discord pour les messages de support.",
                    color: 0x00ff00, // Green color for test
                    fields: [
                        {
                            name: "Status",
                            value: "✅ Webhook fonctionnel",
                            inline: true
                        },
                        {
                            name: "Timestamp",
                            value: new Date().toLocaleString('fr-FR'),
                            inline: true
                        }
                    ],
                    footer: {
                        text: "MWPLU Support System - Test"
                    }
                }
            ]
        };

        // Send to Discord
        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testMessage)
        });

        if (!discordResponse.ok) {
            const errorText = await discordResponse.text();
            throw new Error(`Discord webhook failed: ${discordResponse.status} - ${errorText}`);
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Test message sent to Discord successfully!',
                webhook_status: discordResponse.status
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        console.error('Discord test error:', error);
        return new Response(
            JSON.stringify({
                error: 'Discord test failed',
                details: error.message
            }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );
    }
}); 