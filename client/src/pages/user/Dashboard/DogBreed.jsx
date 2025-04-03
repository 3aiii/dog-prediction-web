import React, { use, useEffect, useState } from "react";
import { gets } from "../../../composables/dogService";

const DogBreed = () => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const { data } = await gets();
      setBreeds(data);
    };
    fetchDogs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-[#2f3542] text-center font-bold my-6 mb-12">
        ข้อมูลสายพันธุ์สุนัข
      </h1>
      <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 gap-4">
        {breeds?.map((breed, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-center text-xl font-semibold mb-2">
              {breed.name}
            </h3>
            <img
              src={breed.image}
              alt={breed.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p>
              <strong>ลักษณะ:</strong> {breed.nature}
            </p>
            <p>
              <strong>นิสัย:</strong> {breed.habits}
            </p>
            <p>
              <strong>การดูแล:</strong> {breed.husbandry}
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
