package com.eworld.ProductService.daos;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eworld.ProductService.beans.Category;


public interface CategoryDao extends JpaRepository<Category, Integer>{
	@Query("select c from Category c where c.name = :name and c.level = :level")
	public Category findByNameAndLevel(@Param("name") String name, @Param("level") short level);
	
	public List<Category> findByParentId(int id);
		
}
