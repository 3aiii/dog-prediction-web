import React from "react";

const DogBreed = () => {
  const breeds = [
    {
      name: "Labrador Retriever",
      image: "labrador.png",
      description: "ตัวใหญ่ ขนสั้น สีดำ น้ำตาล หรือครีม",
      temperament: "ฉลาด เป็นมิตร ขี้เล่น",
      care: "ออกกำลังกายทุกวัน และแปรงขนประจำ",
      origin: "แคนาดา",
    },
    {
      name: "Golden Retriever",
      image: "golden retriever.png",
      description: "ขนยาวนุ่ม สีทองหรือครีม",
      temperament: "ใจดี รักเด็ก ซื่อสัตย์",
      care: "แปรงขนบ่อย และฝึกออกกำลังกาย",
      origin: "สกอตแลนด์",
    },
    {
      name: "Poodle",
      image: "poodle.png",
      description: "ขนหยิก ลอนแน่น ขนาดเล็ก-กลาง-ใหญ่",
      temperament: "ฉลาดมาก เป็นมิตร และเชื่อฟัง",
      care: "ต้องตัดแต่งขนเป็นประจำ",
      origin: "เยอรมนี / ฝรั่งเศส",
    },
    {
      name: "Pomeranian",
      image: "pomeranian.png",
      description: "ตัวเล็ก ขนฟู หน้าตาน่ารัก",
      temperament: "ขี้เล่น ช่างพูด ตื่นตัว",
      care: "แปรงขนทุกวัน และฝึกการเข้าสังคม",
      origin: "โปแลนด์ / เยอรมนี",
    },
    {
      name: "Chihuahua",
      image: "chihuahua.png",
      description: "ตัวเล็กจิ๋ว หัวแอปเปิลหรือหัวกวาง",
      temperament: "กล้าหาญ รักเจ้าของ หวงตัว",
      care: "ระวังเรื่องอากาศเย็น และอาหาร",
      origin: "เม็กซิโก",
    },
    {
      name: "Shiba Inu",
      image: "shiba inu.png",
      description: "ตัวกลาง ขนสองชั้น หางงอ",
      temperament: "อิสระ ฉลาด รักสะอาด",
      care: "ฝึกตั้งแต่เล็ก และให้พื้นที่เล่น",
      origin: "ญี่ปุ่น",
    },
    {
      name: "Siberian Husky",
      image: "siberian.png",
      description: "ตัวใหญ่ ขนหนา ตาสีฟ้าหรือสองสี",
      temperament: "พลังงานสูง รักการวิ่ง เป็นมิตร",
      care: "ออกกำลังกายมาก และควบคุมอุณหภูมิ",
      origin: "ไซบีเรีย (รัสเซีย)",
    },
    {
      name: "Bulldog",
      image: "bulldog.png",
      description: "ตัวเตี้ย หน้าแบน กรามใหญ่",
      temperament: "สงบ รักเด็ก ไม่ชอบเคลื่อนไหวเยอะ",
      care: "เช็ดรอยพับใบหน้า และระวังอ้วน",
      origin: "อังกฤษ",
    },
    {
      name: "Beagle",
      image: "beagle.png",
      description: "ขนาดกลาง หูยาว ดวงตากลม",
      temperament: "ร่าเริง ชอบสำรวจ ซื่อสัตย์",
      care: "พาออกนอกบ้านสม่ำเสมอ",
      origin: "อังกฤษ",
    },
    {
      name: "Corgi",
      image: "corki.png",
      description: "ตัวเตี้ย ขาสั้น หูตั้ง",
      temperament: "ขี้เล่น ฉลาด เป็นมิตร",
      care: "แปรงขนและออกกำลังกายเบา ๆ",
      origin: "เวลส์ (Wales)",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl text-[#2f3542] text-center font-bold my-6 mb-12">
        ข้อมูลสายพันธุ์สุนัข
      </h1>
      <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 gap-4">
        {breeds?.map((breed, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-center text-xl font-semibold mb-2">{breed.name}</h3>
            <img
              src={breed.image}
              alt={breed.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p>
              <strong>ลักษณะ:</strong> {breed.description}
            </p>
            <p>
              <strong>นิสัย:</strong> {breed.temperament}
            </p>
            <p>
              <strong>การดูแล:</strong> {breed.care}
            </p>
            <p>
              <strong>ถิ่นกำเนิด:</strong> {breed.origin}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogBreed;
