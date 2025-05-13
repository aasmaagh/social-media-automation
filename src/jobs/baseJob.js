// src/jobs/baseJob.js
const { chromium } = require('playwright')

class BaseJob {
    constructor(content) {
        this.content = content
        this.browser = null
        this.context = null
        this.page = null
    }
    
    async init() {
        try {
            console.log('Iniciando navegador...')

            this.browser = await chromium.launch({ 
                headless: false,
                    args: [
                        '--no-sandbox', 
                        '--disable-setuid-sandbox',
                        '--start-maximized',
                        '--disable-infobars',
                        '--disable-extensions',
                        '--disable-background-networking',
                        '--disable-sync',
                        '--disable-logging'
                    ]
            })
            
            this.context = await this.browser.newContext()
            
            this.page = await this.context.newPage()
            
            await this.startProcess()

            console.log('Processo concluído!')
        } catch (error) {
            console.error( error)
        }

        await this.close();
    }

    async close() {
        if (this.browser) {
            await this.browser.close()
        }
    }

    // Método abstrato — cada job implementa o seu
    async run() {
        throw new Error('O método "run()" deve ser implementado na subclasse')
    }
}

module.exports = { BaseJob }
