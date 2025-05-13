const { postQueue } = require('../config/queue')

const addToQueue = async (platform, content) => {
    await postQueue.add('postJob', { platform, content })
}

module.exports = { addToQueue }
