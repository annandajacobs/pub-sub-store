const amqp = require('amqplib');

async function connect() {
    const conn = await amqp.connect({
        protocol: 'amqp',
        hostname: process.env.RABBITMQ_HOST,
        port: Number(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_LOGIN,
        password: process.env.RABBITMQ_PASSWORD,
        vhost: process.env.RABBITMQ_VHOST || '/'
    });

    const channel = await conn.createChannel();
    return channel;
}

async function consume(queue, callback) {
    const channel = await connect();
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (msg) => {
        callback(msg);
        channel.ack(msg);
    });
}

module.exports = { consume };
