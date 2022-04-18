package com.example.foodpanda.service;

import com.example.foodpanda.model.FoodCategory;
import com.example.foodpanda.model.Restaurant;
import com.example.foodpanda.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public Restaurant getRestaurantByName(String name) throws Exception{
        return restaurantRepository.findRestaurantByName(name).get(0);
    }

    public List<Restaurant> getALL(){
        return restaurantRepository.findAll();
    }
    @Transactional
    public void saveRestaurant(Restaurant restaurant){
        restaurantRepository.save(restaurant);
    }



    @Transactional
    public void deleteRestaurant(Restaurant restaurant){
        restaurantRepository.delete(restaurant);
    }

    @Transactional
    public void deleteAll(){
        restaurantRepository.deleteAll();
    }


}
