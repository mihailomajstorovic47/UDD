package com.udd.udd.controller;

import com.udd.udd.dto.AdvancedSearchDTO;
import com.udd.udd.dto.AdvancedSearchRequestDTO;
import com.udd.udd.dto.GeoLocationDTO;
import com.udd.udd.dto.SimpleSearchDTO;
import com.udd.udd.model.Location;
import com.udd.udd.service.LocationService;
import com.udd.udd.service.QueryBuilderService;
import com.udd.udd.service.SearchService;
import org.apache.lucene.util.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:4200")
public class SearchController {

    @Autowired
    SearchService searchService;

    @Autowired
    LocationService locationService;

    @PostMapping(value = "/byApplicant")
    public ResponseEntity<?> simpleSearchApplicant(@RequestBody SimpleSearchDTO dto) {
        NativeSearchQuery query;

        if(dto.getPhrase()){
            query = QueryBuilderService.buildQueryApplicantPhrase(dto);
        }else{
            query = QueryBuilderService.buildQueryApplicant(dto);
        }

        return new ResponseEntity<>(searchService.simpleSearch(query), HttpStatus.OK);
    }

    @PostMapping(value = "/byEducation")
    public ResponseEntity<?> simpleSearchEducation(@RequestBody SimpleSearchDTO dto) {
        NativeSearchQuery query = QueryBuilderService.buildQueryEducation(dto);

        return new ResponseEntity<>(searchService.simpleSearch(query), HttpStatus.OK);
    }

    @PostMapping(value = "/byCV")
    public ResponseEntity<?> searchByCV(@RequestBody SimpleSearchDTO dto) {
        NativeSearchQuery query = QueryBuilderService.buildQueryCV(dto);

        return new ResponseEntity<>(searchService.simpleSearch(query), HttpStatus.OK);
    }

    @PostMapping(value = "/byCL")
    public ResponseEntity<?> searchByCoverLetter(@RequestBody SimpleSearchDTO dto) {
        NativeSearchQuery query = QueryBuilderService.buildQuerysearchByCoverLetter(dto);

        return new ResponseEntity<>(searchService.simpleSearch(query), HttpStatus.OK);
    }

    @PostMapping(value = "/byGeoLocation")
    public ResponseEntity<?> searchByGeoLocation(@RequestBody GeoLocationDTO dto) throws Exception {
        Location location = locationService.getLocationFromAddress(dto.getCity());
        NativeSearchQuery query = QueryBuilderService.buildQuerysearchByGeoLocation(dto, location);

        return new ResponseEntity<>(searchService.simpleSearch(query), HttpStatus.OK);
    }

    @PostMapping(value = "/advanced")
    public ResponseEntity<?> advancedSearch(@RequestBody List<AdvancedSearchRequestDTO> dto) throws Exception {

        NativeSearchQuery query = QueryBuilderService.buildQuerysearchAdvanced(dto);

        return new ResponseEntity<>(searchService.simpleSearch(query), HttpStatus.OK);
    }
}
