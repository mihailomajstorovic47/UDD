package com.udd.udd.service;

import com.udd.udd.dto.SearchResponseDTO;
import com.udd.udd.model.Applicant;
import com.udd.udd.model.IndexUnit;
import com.udd.udd.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;

    @Autowired
    private ApplicationRepository applicationRepository;

    public List<SearchResponseDTO> simpleSearch(NativeSearchQuery searchQuery){
        System.out.println(searchQuery.getQuery());
        SearchHits<IndexUnit> searchHits = elasticsearchRestTemplate.search(searchQuery, IndexUnit.class, IndexCoordinates.of("applicant"));
        return getSearchResponse(searchHits);
    }


    private List<SearchResponseDTO> getSearchResponse(SearchHits<IndexUnit> searchHits) {
        List<SearchResponseDTO> searchResponses = new ArrayList<>();
        System.out.println(searchHits.get().count());
        for(SearchHit<IndexUnit> searchHit : searchHits) {
            SearchResponseDTO searchResponse = new SearchResponseDTO();

            searchResponse.setId(searchHit.getId());
            searchResponse.setFirstName(searchHit.getContent().getFirstName());
            searchResponse.setLastName(searchHit.getContent().getLastName());
            searchResponse.setEducation(searchHit.getContent().getEducation());
            Applicant a = applicationRepository.findById(Long.valueOf(searchHit.getId())).orElseGet(null);
            searchResponse.setAddress(a.getStreet() + ", " + a.getCity());

            if (searchHit.getHighlightFields().isEmpty()) {
                if (searchHit.getContent().getCvContent().length() < 200)
                    searchResponse.setHighlight(searchHit.getContent().getCvContent().substring(0, searchHit.getContent().getCvContent().length()) + "...");
                else
                    searchResponse.setHighlight(searchHit.getContent().getCvContent().substring(0, 200) + "...");
            } else {
                if(searchHit.getHighlightFields().get("cvContent") != null){
                    searchResponse.setHighlight("..." + searchHit.getHighlightFields().get("cvContent").get(0) + "...");
                }
                else{
                    searchResponse.setHighlight("..." + searchHit.getHighlightFields().get("clContent").get(0) + "...");

                }
            }


            searchResponses.add(searchResponse);
        }

        return searchResponses;
    }

}
