import { test, expect } from '@playwright/test';
import { analyzePerformance } from './performanceUtils';

test.describe('Pruebas de rendimiento del DOM', () => {

    test('Validar métricas de rendimiento en Google', async () => {
        const metrics = await analyzePerformance('https://www.google.com');
        console.log("📊 Métricas detalladas:", metrics);
        expect(metrics.score).toBeGreaterThanOrEqual(50);
        expect(metrics.fcp).toBeLessThan(2500); // FCP < 2.5 segundos
        expect(metrics.lcp).toBeLessThan(2500); // LCP < 2.5 segundos
        expect(metrics.tbt).toBeLessThan(300);  // TBT < 300ms
        expect(metrics.cls).toBeLessThan(0.1);  // CLS aceptable
    });
});