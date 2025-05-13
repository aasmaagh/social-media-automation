const { BaseJob } = require('./baseJob')

class LinkedInJob extends BaseJob {
    constructor(content) {
        super(content)
    }

    async run() {
        await this.init()
    }

    async startProcess() {
        await this.login()

        await this.fillContent()
    }

    async login() {
        await this.page.goto('https://www.linkedin.com/login')

        console.info('Iniciando login...')

        await this.page.fill('//input[@id="username"]', process.env.LINKEDIN_USER)

        await this.page.fill('//input[@id="password"]', process.env.LINKEDIN_PASSWORD)

        await this.page.click('//button[@type="submit"]')

        await this.page.waitForTimeout(5000) // aguarda login

        const errorElement = await this.page.$('//div[@id="error-for-password"]')
        if (errorElement) {
            const errorText = await errorElement.textContent()
            throw new Error(`Erro técnico ao logar no LinkedIn: ${errorText.trim()}`)
        }
    }

    async fillContent() {
        await this.page.click("//strong[contains(text(), 'Comece uma publicação')]/ancestor::button[position()=1]")

        await this.page.fill('//div[@role="textbox"]', this.content)

        await this.page.click("//div[contains(@class, 'share-box')]/button[contains(@class, 'primary-action')]")

        await this.page.waitForTimeout(5000)

        console.log('Post no LinkedIn concluído!')
    }
}

module.exports = { LinkedInJob }
