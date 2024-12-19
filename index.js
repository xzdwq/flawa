import { dmxnet } from 'dmxnet';
// import artnet from 'artnet';

const dmx = new dmxnet({
  log: { level: 'info' },
});

// Создаем приемник Art-Net
const receiver = dmx.newReceiver({
  subnet: 0,    // Subnet (0 по умолчанию)
  universe: 0,  // Universe (номер вселенной)
  net: 0,       // Net (обычно 0)
});

// const sender = artnet({ host: '192.168.0.100' }); // IP контроллера

// Создаем отправитель Art-Net
const sender = dmx.newSender({
  ip: "192.168.0.100",  // IP-адрес контроллера
  subnet: 0,            // Subnet (0 по умолчанию)
  universe: 0,          // Universe (номер вселенной)
  net: 0,               // Net (обычно 0)
  port: 6454,           // Порт Art-Net (по умолчанию 6454)
});

// Слушаем входящие данные от контроллера
receiver.on('data', (data) => {
  console.log('Получены данные Art-Net:', data);

  // Обработка данных: первый и второй каналы
  const button1 = data[0]; // Первый канал
  const button2 = data[1]; // Второй канал

  if (button1 > 0) {
    console.log('Кнопка 1 нажата! Запускаем анимацию...');
    sender.fillChannels(1, 3, 255); // Устанавливаем красный цвет на каналы 1-3
  }

  if (button2 > 0) {
    console.log('Кнопка 2 нажата!');
    sender.fillChannels(1, 3, 0); // Отключаем цвет на каналы 1-3
  }
});

// Обработка ошибок
receiver.on('error', (err) => {
  console.error('Ошибка DMXNet (прием):', err);
});
