import Fastify from 'fastify';
import cors from '@fastify/cors';
import { CodeProofEngine } from '@codeproof/engine';

const fastify = Fastify({ logger: true });
const engine = new CodeProofEngine();

const start = async () => {
  try {
    await fastify.register(cors, { origin: '*' });

    fastify.get('/api/health', async () => {
      return { status: 'ok', service: 'CodeProof API', timestamp: new Date().toISOString() };
    });

    fastify.get('/api/git/diff', async () => {
      const gitInfo = await engine.inspectGitDiff();
      return { gitInfo };
    });

    fastify.post('/api/testing/matrix', async () => {
      const testMatrix = await engine.runFullTestingSuite();
      return { testMatrix };
    });

    fastify.post('/api/tasks/analyze', async (request, reply) => {
      const body = request.body as { intent: string; targetFiles?: string[] };
      if (!body?.intent) {
        return reply.status(400).send({ error: 'Developer intent is required' });
      }

      const task = await engine.analyzeTask(body.intent, body.targetFiles || []);
      const planEval = engine.evaluatePlan(task, []);
      const policies = engine.evaluatePolicies(task);
      
      return { task, planEval, policies };
    });

    fastify.post('/api/verify', async (request, reply) => {
      const body = request.body as { intent: string; targetFiles?: string[] };
      const task = await engine.analyzeTask(body?.intent || 'API Verification Task', body?.targetFiles || []);
      const results = await engine.verifyChanges(task);
      return { task, results };
    });

    fastify.post('/api/proofs/generate', async (request, reply) => {
      const body = request.body as { intent: string; targetFiles?: string[] };
      const task = await engine.analyzeTask(body?.intent || 'API Proof Task', body?.targetFiles || []);
      const planEval = engine.evaluatePlan(task, []);
      const results = await engine.verifyChanges(task);
      const proof = engine.generateProof(task, planEval, results);
      const markdown = engine.formatMarkdownProof(proof);

      return { proof, markdown };
    });

    const port = Number(process.env.PORT) || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`CodeProof Control API running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
