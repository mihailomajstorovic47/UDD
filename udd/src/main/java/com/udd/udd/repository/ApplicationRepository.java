package com.udd.udd.repository;

import com.udd.udd.model.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Applicant, Long> {
}
