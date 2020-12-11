package com.example.demo.repository;

import com.example.demo.entity.ImportedReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImportedReceiptRepository extends JpaRepository<ImportedReceipt, Integer> {

    List<ImportedReceipt> getImportedChartByStoreId(String storeId);

    @Query("from ImportedReceipt ir " +
            "where ir.store.id is not null " +
            "group by date(ir.createdAt) " +
            "order by ir.createdAt")
    List<ImportedReceipt> getImportedChartAllStores();

}
