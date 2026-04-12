# Starfall Animation

React tabanlı, hiperspace/warp drive tarzı yıldız animasyonu.

## Demo

Canlı demo: **[starfall-animation.vercel.app](https://starfall-animation.vercel.app)** (Ekranın sağ alt köşesindeki "Start a Journey" butonuna tıklayın")

## Özellikler

- 🎇 800 yıldız ile gerçekçi warp effect
- 🌈 Yumuşak renk geçişleri
- 📱 Tam responsive (mobil desteği)
- ⚡ Performans için Canvas API kullanımı

## Kurulum

```bash
git clone https://github.com/kullanici-adi/starfall-animation.git
cd starfall-animation
npm install
npm run dev
```

## Kullanım

```jsx
import WarpAnimation from './WarpAnimation';

function App() {
  return <WarpAnimation />;
}
```

### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `isActive` | boolean | true | Animasyonu göster/gizle |
| `onClose` | function | - | Butona tıklandığında çalışır |

## Teknoloji

- React 19
- Vite 8
- Canvas API

## Lisans

MIT License - detaylar LICENSE dosyasında.
