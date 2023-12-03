package com.sena.carritocompra.Controller;
import com.sena.carritocompra.Entity.Producto;
import com.sena.carritocompra.IService.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("v1/api/producto")
public class ProductoContrller {
	@Autowired
	private IProductoService service;
	
	@GetMapping
	public List<Producto> findAll() {
		return service.findAll();
	}
	
	@GetMapping("{id}")
	public Optional<Producto> findById(@PathVariable Long id) {
		return service.findById(id);
	}
	
	@PostMapping
	public Producto save(@RequestBody Producto producto) {
		return service.save(producto);
	}
	
	@PutMapping("{id}")
	public void save(@RequestBody Producto producto, @PathVariable  Long id) {
		service.update(producto, id);
	}
	
	@PutMapping("deleted-at/{id}")
	public void deletedAt(@PathVariable  Long id) {
		service.deletedAt(id);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable  Long id) {
		service.delete(id);
	}
}
