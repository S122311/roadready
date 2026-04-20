# RoadReady Public URL

Use Render for the first public version.

## Deploy

1. Push this `roadready` folder to a GitHub repository.
2. Open https://dashboard.render.com/blueprints.
3. Connect the GitHub repository.
4. Render will read `render.yaml`.
5. Add these environment variables in Render:

```text
APP_URL=https://your-render-url.onrender.com
STRIPE_SECRET_KEY=sk_test_or_live_key
STRIPE_PRICE_STARTER=price_starter
STRIPE_PRICE_FLEET=price_fleet
STRIPE_PRICE_ENTERPRISE=price_enterprise
OPENAI_API_KEY=sk_openai_key_optional
OPENAI_MODEL=gpt-5
```

6. Deploy.
7. After Render gives the final URL, update `APP_URL` to match that exact URL and redeploy.

## Notes

The current MVP saves data to `data/roadready-state.json`. That is okay for local testing. For a real customer launch, move the saved data to a database so company records survive deploys and server restarts.
