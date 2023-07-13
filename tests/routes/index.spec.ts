import { expect, test } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
import routes from '../../src/routes/index';

app.use(cookieParser());
app.use('/', routes);

test('/pricing - Assert that /pricing works correctly', async () => {
    const res = await request(app).get(`/pricing`);

    expect(res.statusCode).toBe(200);
    expect(res.text.includes('Hotjar Pricing page')).toEqual(true);
});

test('/pricing - Assert that /pricing sends the same result (Control|Variant) if we request again', async () => {
    const result1 = await request(app).get(`/pricing`);

    const cookie = result1.get('Set-Cookie');

    const isVariantFirstTime1 = result1.text.includes('variant1');
    const isControlFirstTime1 = result1.text.includes('variant1');

    const result2 = await request(app).get(`/pricing`).set('Cookie', cookie);

    const isVariantFirstTime2 = result2.text.includes('variant1');
    const isControlFirstTime2 = result1.text.includes('variant1');

    const result3 = await request(app).get(`/pricing`).set('Cookie', cookie);

    const isVariantFirstTime3 = result3.text.includes('variant1');
    const isControlFirstTime3 = result1.text.includes('variant1');

    expect(result1.statusCode).toBe(200);
    expect(result2.statusCode).toBe(200);
    expect(result3.statusCode).toBe(200);
    expect(isVariantFirstTime1).toEqual(isVariantFirstTime2);
    expect(isVariantFirstTime2).toEqual(isVariantFirstTime3);
    expect(isControlFirstTime1).toEqual(isControlFirstTime2);
    expect(isControlFirstTime2).toEqual(isControlFirstTime3);
});

test('/redirect - Assert that non admins will be redirected to /pricing', async () => {
    const res = await request(app).get(`/redirect`);

    expect(res.text).toEqual('Found. Redirecting to /pricing');
});

test('/redirect - Assert that admins will be redirected to /redirect and control page', async () => {
    const res = await request(app)
        .get(`/redirect`)
        .query({ page: 'control' })
        .set('Cookie', ['admin=true']);

    expect(res.text.includes('control')).toEqual(true);
    expect(!res.text.includes('variant1')).toEqual(true);
});

test('/redirect - Assert that admins will be redirected to /redirect and variant1 page', async () => {
    const res = await request(app)
        .get(`/redirect`)
        .query({ page: 'variant' })
        .set('Cookie', ['admin=true']);

    expect(!res.text.includes('control')).toEqual(true);
    expect(res.text.includes('variant1')).toEqual(true);
});
