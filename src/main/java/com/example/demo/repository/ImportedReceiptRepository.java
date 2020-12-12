package com.example.demo.repository;

import com.example.demo.entity.ImportedReceipt;
import com.example.demo.response.ImportedChartResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImportedReceiptRepository extends JpaRepository<ImportedReceipt, Integer> {

    List<ImportedReceipt> getImportedChartByStoreId(String storeId);

    @Query("select new com.example.demo.response.ImportedChartResponse(date(ir.createdAt), sum(ir.importedQuantity)) " +
            "from ImportedReceipt ir " +
            "where ir.store.id is not null " +
            "group by date(ir.createdAt) " +
            "order by ir.createdAt")
    List<ImportedChartResponse> getImportedChartAllStores();

}
