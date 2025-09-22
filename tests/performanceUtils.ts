import { chromium, BrowserContext, Page } from 'playwright';
import { playAudit } from 'playwright-lighthouse';
import * as path from 'path';

// Definicion de interfaz que usaremos en las metricas
export interface PerformanceMetrics {
    score: number;
    fcp: number;
    lcp: number;
    tbt: number;
    cls: number;
}

export async function analyzePerformance(url: string): Promise<PerformanceMetrics> {
    const port = 9222;
    const headless = true; // Siempre en true para entornos CI/CD

    // Lanza un contexto y lo mantiene para que Lighthouse se pueda conectar
    const context = await chromium.launchPersistentContext('', {
        devtools: true,
        headless: headless,
        args: [`--remote-debugging-port=${port}`],
    });
    const page = await context.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // Manejo de cookies
        const commonSelectors = [
            'button:has-text("Aceptar todo"), button:has-text("Accept all")',
            '.cookie-banner button',
            '#cookie-consent button'
        ].join(', ');

        try {
            const acceptButton = page.locator(commonSelectors).first();
            await acceptButton.waitFor({ state: 'visible', timeout: 5000 });
            await acceptButton.click();
            await page.waitForTimeout(1000);
            console.log('Cookie banner accepted.');
        } catch (e) {
            console.log('No cookie consent banner found.');
        }

        // Espera a que un elemento principal sea visible
        const contentSelectors = ['input[name="q"]', 'main', '#main', 'body'].join(', ');
        await page.locator(contentSelectors).first().waitFor({ state: 'visible', timeout: 15000 });

        // Ejecuta Lighthouse
        const { lhr } = await playAudit({
            page,
            port,
            thresholds: { performance: 10 },
            reports: {
                formats: { html: true, json: true },
                name: 'lighthouse-report',
                directory: path.join(process.cwd(), 'reports/lighthouse'),
            },
            disableLogs: true,
            ignoreError: true,
            config: {
                extends: 'lighthouse:default',
                settings: {
                    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
                }
            }
        });

        // Extrae las métricas del reporte
        const metrics: PerformanceMetrics = {
            score: lhr.categories.performance.score * 100,
            fcp: lhr.audits['first-contentful-paint'].numericValue,
            lcp: lhr.audits['largest-contentful-paint'].numericValue,
            tbt: lhr.audits['total-blocking-time'].numericValue,
            cls: lhr.audits['cumulative-layout-shift'].numericValue,
        };
        return metrics;

    } finally {
        // cerrar el navegador y si hay errores tambien
        await context.close();
    }
}