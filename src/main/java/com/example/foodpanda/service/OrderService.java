package com.example.foodpanda.service;

import com.example.foodpanda.model.Order;
import com.example.foodpanda.model.Restaurant;
import com.example.foodpanda.model.User;
import com.example.foodpanda.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getALL(){
        return orderRepository.findAll();
    }

    public  List<Order> getByUser(User user){
        return orderRepository.findOrderByUser(user);
    }
    public  List<Order> getByRestaurant(Restaurant restaurant){
        return orderRepository.findOrderByRestaurant(restaurant);
    }

    @Transactional
    public void saveOrder(Order order){
        orderRepository.save(order);
    }

    @Transactional
    public void deleteOrder(Order order){
        orderRepository.delete(order);
    }

    @Transactional
    public void deleteAll(){
        orderRepository.deleteAll();
    }

}
