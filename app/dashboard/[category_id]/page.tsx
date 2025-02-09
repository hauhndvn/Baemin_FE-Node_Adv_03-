"use client";

import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Category {
  category_id: number;
  category_name: string;
  description: string;
  cat_thumbnail: string;
}

interface BannerItem {
  id: number;
  name: string;
  url: string;
}

interface FoodItem {
  food_id: number;
  name_food: string;
  address: string;
  thumbnail: string;
  kind: string;
}

export default function CategoryPage({ params }: { params: { category_id: string } }) {
  const { category_id } = params;
  const [food, setFood] = useState<FoodItem[]>([]);
  const [foodFeatured, setFoodFeatured] = useState<FoodItem[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [banneritems, setBanneritems] = useState<BannerItem[]>([]);

  useEffect(() => {
    if (!category_id) return;

    axios
      .get(`http://localhost:8080/food/category/${category_id}`)
      .then((res) => {
        setFood(res.data.data.docs);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8080/food/category/${category_id}?featured=true`)
      .then((res) => {
        setFoodFeatured(res.data.data.docs);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8080/category`)
      .then((res) => {
        setCategory(res.data.data.docs);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8080/banneritem`)
      .then((res) => {
        setBanneritems(res.data.data.docs);
      })
      .catch((err) => console.log(err));
  }, [category_id]);

  const TodayFood = {
    title: `Món ăn mới`,
    items: food.map((item) => ({
      id: item.food_id,
      name: item.name_food,
      adrress: item.address,
      img: item.thumbnail,
      kind: item.kind,
    })),
  };

  const TodayFoodFeatured = {
    title: "Món ăn tiêu biểu",
    items: foodFeatured.map((item) => ({
      id: item.food_id,
      name: item.name_food,
      adrress: item.address,
      img: item.thumbnail,
      kind: item.kind,
    })),
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8 z-40">
          <div className="flex flex-col fixed bg-white w-64 rounded-2xl pl-3 pt-2 pb-5 gap-3">
            <span>Thực đơn</span>
            {category?.map((item, index) => (
              <Link
                key={index}
                href={`/dashboard/${item.category_id}`}
                className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
              >
                <div className="flex flex-row items-center gap-1">
                  <Image src={item.cat_thumbnail} width={30} height={30} alt={item.description} />
                  <span>{item.category_name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-9 w-full pt-3 pr-8 gap-3 flex flex-col">
          <ScrollBar items={banneritems}></ScrollBar>
          <ScrollFood items={TodayFood}></ScrollFood>
          <ScrollFood items={TodayFoodFeatured}></ScrollFood>
        </div>
      </div>
    </>
  );
}
