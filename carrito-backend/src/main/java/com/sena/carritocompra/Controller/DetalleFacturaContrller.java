package com.sena.carritocompra.Controller;

import com.sena.carritocompra.Entity.DetalleFactura;
import com.sena.carritocompra.IService.IDetalleFacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("v1/api/DetalleFactura")

public class DetalleFacturaContrller {

	@Autowired  private IDetalleFacturaService service;
	@GetMapping
	public List<DetalleFactura> findAll() {
		return service.findAll();
	}
	
	@GetMapping("{id}")
	public Optional<DetalleFactura> findById(@PathVariable Long id) {
		return service.findById(id);
	}
	
	@PostMapping
	public DetalleFactura save(@RequestBody DetalleFactura detalleFactura) {
		return service.save(detalleFactura);
	}
	
	@PutMapping("{id}")
	public void save(@RequestBody DetalleFactura detalleFactura, @PathVariable  Long id) {
		service.update(detalleFactura, id);
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
