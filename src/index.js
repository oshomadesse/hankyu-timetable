export default {
  async fetch(request, env) {
    // CORSヘッダー設定
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // OPTIONSリクエスト（プリフライト）対応
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // POST以外は拒否
    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders
      });
    }

    try {
      // リクエストボディからパスワード取得
      const { password } = await request.json();

      // Secretsからパスワード取得
      const correctPassword = env.PASSWORD;

      // パスワード照合
      if (password === correctPassword) {
        return new Response(JSON.stringify({ success: true }), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      } else {
        return new Response(JSON.stringify({ success: false }), {
          status: 401,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid request'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
  }
};
