package com.example.foodpanda.repository;

import com.example.foodpanda.model.Food;
import com.example.foodpanda.model.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food,Long> {
        List<Food> findFoodByName(String name);
        List<Food> findFoodByCategory(FoodCategory category);
        List<Food> findAll();
        @Query("SELECT f FROM Food f " +
                "LEFT OUTER JOIN Restaurant r on f.restaurant = r " +
                "where r.name like %:restaurantName% " )
        public List<Food> getFoodsByRestaurantName(@Param("restaurantName") String restaurantName);
}