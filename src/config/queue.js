const { Worker, Queue } = require("bullmq")
const redisConection = require("./redis")
const { LinkedInJob } = require("../jobs/linkedinJob")

const postQueue = new Queue('postQueue', { connection: redisConection })

const worker = new Worker(
    'postQueue',
    async (job) => {
        const { platform, content } = job.data

        if (platform === 'linkedin') {
            const jobInstance = new LinkedInJob(content)
            await jobInstance.run()
        } else {
            console.error('Plataforma não suportada:', platform)
        }
    },
    { 
        connection: redisConection,
        concurrency: 5
    }
)

worker.on('completed', (job) => {
    console.log(`✅ Job ${job.id} finalizado!`)
})

worker.on('failed', (job, err) => {
    console.error(`❌ Job ${job.id} falhou:`, err)
})

module.exports = { postQueue }