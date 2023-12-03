package com.sena.carritocompra.IService;

import com.sena.carritocompra.Entity.DetalleFactura;

import java.util.List;
import java.util.Optional;

public interface IDetalleFacturaService {
	
	/**
	 * Método para consultar todo
	 * **/
	public List<DetalleFactura> findAll();
	
	/**
	 * Método para consultar por id
	 * **/
	public Optional<DetalleFactura> findById(Long id);
	
	
	/**
	 * Método para guardar
	 * **/
	public DetalleFactura save(DetalleFactura detalleFactura);
	
	/**
	 * Método para modificar
	 * **/
	public void update(DetalleFactura detalleFactura, Long id);
	
	/**
	 * Método para eliminar
	 * **/
	public void delete(Long id);

	/**
	 * Método para eliminar lógico
	 * **/
	public void deletedAt(Long id);
	
	
}
