const RabbitMQService = require('./rabbitmq-service');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

var report = {}

async function updateReport(products) {
    for (let product of products) {
        if (!product.name) {
            continue;
        } else if (!report[product.name]) {
            report[product.name] = 1;
        } else {
            report[product.name]++;
        }
    }
}

async function printReport() {
    console.log("\n RELATÓRIO ATUALIZADO");
    for (const [key, value] of Object.entries(report)) {
        console.log(`${key} = ${value} sales`);
    }
}

async function consume() {

    const queue = process.env.RABBITMQ_QUEUE_NAME;

    console.log(`Aguardando mensagens da fila: ${queue}`);

    await RabbitMQService.consume(queue, async (message) => {
        const content = JSON.parse(message.content.toString());

        console.log("\nNova venda recebida:");
        console.log(content);

        await updateReport(content.products);
        await printReport();
    });
}

consume();
