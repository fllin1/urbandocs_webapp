import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface AccountDeletionRequest {
    action: 'schedule' | 'cancel' | 'status';
    reason?: string;
}

interface AccountDeletionResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
}

Deno.serve(async (req: Request): Promise<Response> => {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // Initialize Supabase client
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        // Get the authorization header
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Missing authorization header'
                }),
                {
                    status: 401,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            );
        }

        // Verify the user's JWT token
        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

        if (authError || !user) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Invalid or expired token'
                }),
                {
                    status: 401,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            );
        }

        // Parse request body
        const requestData: AccountDeletionRequest = await req.json();
        const { action, reason } = requestData;

        let result: AccountDeletionResponse;

        switch (action) {
            case 'schedule':
                // Schedule account deletion
                const { data: scheduleData, error: scheduleError } = await supabaseClient
                    .rpc('schedule_account_deletion', {
                        user_id: user.id,
                        reason: reason || 'User requested account deletion'
                    });

                if (scheduleError) {
                    throw scheduleError;
                }

                result = {
                    success: true,
                    message: 'Account deletion scheduled successfully',
                    data: scheduleData
                };
                break;

            case 'cancel':
                // Cancel account deletion
                const { data: cancelData, error: cancelError } = await supabaseClient
                    .rpc('cancel_account_deletion', {
                        user_id: user.id
                    });

                if (cancelError) {
                    throw cancelError;
                }

                result = {
                    success: true,
                    message: 'Account deletion cancelled successfully',
                    data: cancelData
                };
                break;

            case 'status':
                // Get account deletion status
                const { data: statusData, error: statusError } = await supabaseClient
                    .rpc('get_account_deletion_status', {
                        user_id: user.id
                    });

                if (statusError) {
                    throw statusError;
                }

                result = {
                    success: true,
                    message: 'Account status retrieved successfully',
                    data: statusData
                };
                break;

            default:
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: 'Invalid action. Must be one of: schedule, cancel, status'
                    }),
                    {
                        status: 400,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    }
                );
        }

        return new Response(
            JSON.stringify(result),
            {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        console.error('Account management error:', error);

        return new Response(
            JSON.stringify({
                success: false,
                error: error.message || 'Internal server error'
            }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );
    }
}); 