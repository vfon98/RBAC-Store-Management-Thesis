package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.entity.Store;
import com.example.demo.form.StoreForm;
import com.example.demo.response.MessageResponse;
import com.example.demo.security.constants.StaffPermission;
import com.example.demo.security.constants.StorePermission;
import com.example.demo.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/stores")
@Validated
public class StoreController {

    private StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public ResponseEntity<List<Store>> findAll() {
        List<Store> stores = storeService.findAll();
        return new ResponseEntity<>(stores, HttpStatus.OK);
    }

    @GetMapping(value = "{storeId}")
    @PreAuthorize("hasAuthority(\"" + StorePermission.READ + "\")")
    public ResponseEntity<Store> findById(@PathVariable Integer storeId) {
        Store store = storeService.findById(storeId);
        return new ResponseEntity<>(store, HttpStatus.OK);
    }

    @GetMapping(value = "{storeId}/products")
    @PreAuthorize("hasAuthority(\"" + StorePermission.READ + "\")")
    public ResponseEntity<List<Product>> findAllProducts(@PathVariable Integer storeId) {
        return ResponseEntity.ok(
                storeService.findAllProductsByStoreId(storeId));
    }

    @GetMapping(value = "status")
    public ResponseEntity<?> getAllStatus() {
        return ResponseEntity.ok(Store.Status.values());
    }

    @GetMapping(value = "management")
    @PreAuthorize("hasAuthority(\"" + StorePermission.READ + "\")")
    public ResponseEntity<?> getManageableStores() {
        List<Store> stores = storeService.getManageableStores();
        return ResponseEntity.ok(stores);
    }

    @GetMapping(value = "{storeId}/staffs")
    @PreAuthorize("hasAuthority(\"" + StaffPermission.READ + "\")")
    public ResponseEntity<?> getStaffs(
            @PathVariable Integer storeId,
            @RequestParam(required = false, value = "is_manager") Boolean isManager) {
        return ResponseEntity.ok(storeService.findStaffsByStore(storeId));
    }

//    @GetMapping(value = "{storeId}/products")
//    @PreAuthorize("hasAuthority(\"" + StorePermission.READ + "\")")
//    public ResponseEntity<?> getProductsByIsAdded(
//            @PathVariable Integer storeId,
//            @RequestParam(value = "is_added") Boolean isAdded) {
//        return ResponseEntity.ok(
//                storeService.findProductsByStoreAndIsAdded(storeId, isAdded)
//        );
//    }

    @GetMapping(value = "{storeId}/categories")
    public ResponseEntity<List<Category>> getAllCategoriesByStore(@PathVariable Integer storeId) {
        return ResponseEntity.ok(storeService.findCategoriesByStore(storeId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority(\"" + StorePermission.CREATE + "\")")
    public ResponseEntity<Store> createStore(@Valid @RequestBody StoreForm storeForm) {
        Store store = storeService.save(storeForm);

        return new ResponseEntity<>(store, HttpStatus.OK);
    }

    @PutMapping("{storeId}/products/{productId}")
    @PreAuthorize("hasAuthority(\"" + StorePermission.UPDATE + "\")")
    public ResponseEntity<?> addProductToStore(
            @PathVariable Integer storeId,
            @PathVariable Integer productId,
            @RequestParam Integer quantity,
            @RequestParam(required = false, defaultValue = "false") Boolean isImport) {

        storeService.addProductToStore(storeId, productId, quantity);
        String message = "Add product to store successfully!";
//        String message = "";
//        if (isImport) { // Revert here
//            storeService.addProductToStore(storeId, productId, quantity);
//            message = "Add product to store successfully!";
//        } else {
//            storeService.updateQuantityOfProductInStore(storeId, productId, quantity);
//            message = "Update quantity successfully!";
//        }
        return new ResponseEntity<>(new MessageResponse(message), HttpStatus.OK);
    }

    @DeleteMapping("{storeId}/products/{productId}")
    @PreAuthorize("hasAuthority(\"" + StorePermission.UPDATE + "\")")
    public ResponseEntity<?> deleteProductFromStore(@PathVariable Integer storeId, @PathVariable Integer productId) {
        storeService.deleteProductFromStore(storeId, productId);
        return ResponseEntity.ok(new MessageResponse("Delete product form store successfully!"));
    }

    @PutMapping("{storeId}/staffs")
    @PreAuthorize("hasAuthority(\"" + StorePermission.UPDATE + "\")")
    public ResponseEntity<?> addStaffListToStore(@PathVariable Integer storeId, @RequestBody Set<Integer> idStaff) {
        storeService.addStaffListToStore(storeId, idStaff);
        return ResponseEntity.ok(new MessageResponse("Add staffs to store successfully!"));
    }

    @DeleteMapping("{storeId}")
    @PreAuthorize("hasAuthority(\"" + StorePermission.DELETE + "\")")
    public ResponseEntity<?> deleteStore(@PathVariable Integer storeId) {
        Integer id = storeService.deleteById(storeId);
        return new ResponseEntity<>(new MessageResponse("Deleted id: " + id), HttpStatus.OK);
    }

    @DeleteMapping(value = "{storeId}/staffs/{staffId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority(\"" + StorePermission.UPDATE + "\")")
    public ResponseEntity<?> removeStaffFromStore(@PathVariable Integer storeId, @PathVariable Integer staffId) {
        storeService.removeStaffFromStore(storeId, staffId);
        return ResponseEntity.ok(new MessageResponse("remove staff with id " + staffId + " from store " + storeId + " successfully!"));
    }

    @PutMapping(value = "{storeId}/staffs/{staffId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority(\"" + StorePermission.UPDATE + "\")")
    public ResponseEntity<?> addStaffToStore(@PathVariable Integer storeId, @PathVariable Integer staffId) {
        storeService.addStaffToStore(storeId, staffId);
        return ResponseEntity.ok(new MessageResponse("add staff with id " + staffId + " to store " + storeId + " successfully!"));
    }
}
