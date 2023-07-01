package com.udd.udd.repository;

import com.udd.udd.model.IndexUnit;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface IndexUnitRepository extends ElasticsearchRepository<IndexUnit, String> {
}
