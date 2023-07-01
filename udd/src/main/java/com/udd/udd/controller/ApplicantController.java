package com.udd.udd.controller;

import com.udd.udd.dto.ApplicantDTO;
import com.udd.udd.dto.DownloadFileDTO;
import com.udd.udd.dto.HireDTO;
import com.udd.udd.dto.RegisterDTO;
import com.udd.udd.model.Applicant;
import com.udd.udd.model.IndexUnit;
import com.udd.udd.service.ApplicantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("applicant")
@CrossOrigin(origins = "http://localhost:4200")
public class ApplicantController {

    @Autowired
    ApplicantService applicantService;

    @Autowired
    private HttpServletResponse response;

    private static final Logger logger = LoggerFactory.getLogger(ApplicantController.class);


    @PostMapping
    public void save(@RequestBody IndexUnit applicant){
        applicantService.save(applicant);
    }

    @GetMapping("/getAll")
    public List<ApplicantDTO> getAll(){
        return applicantService.getAll();
    }


    @GetMapping("/{id}")
    public IndexUnit findById(@PathVariable String id){
        return applicantService.findById(id);
    }

    @GetMapping
    public Iterable<IndexUnit> find(){
        return applicantService.find();
    }

    @GetMapping("/delete")
    public ResponseEntity<?> delete(){
        applicantService.deleteAll();
        return new ResponseEntity<>(applicantService.find(), HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        // Save the file to disk or process it in memory
        System.out.println(file);
        return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
    }


    @PostMapping(value = "/register", consumes = { "multipart/form-data" })
    public ResponseEntity<?> register(@ModelAttribute RegisterDTO dto) throws Exception {
        System.out.println(dto.getCv());

        IndexUnit a = applicantService.register(dto);
        if(a == null){

            return new ResponseEntity<>("Failed registration!!", HttpStatus.BAD_REQUEST);
        }
        logger.info("Request for registration received from city: {}", dto.getCity());
        return new ResponseEntity<>("Success registration", HttpStatus.OK);
    }

    @PostMapping("/downloadFile")
    @ResponseBody public ResponseEntity<Resource> downloadFile(@RequestBody DownloadFileDTO dto, HttpServletResponse response) {
        Applicant a = applicantService.findById(Long.valueOf(dto.getId()));
        try {
            String filename;

            if (dto.getIsCV()) {
                filename = a.getCvName();
            } else {
                filename = a.getClName();
            }

            File file = new File("src/main/resources/downloads/" + filename);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            System.out.println("The length of the file is : " + file.length());
            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            response.setHeader("Content-disposition", "attachment; filename=" + file);
            response.setContentLength((int) file.length());

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(file.length())
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        } catch (Exception e){
            e.printStackTrace();
        }
            return null;
    }

    @PostMapping("/hire")
    @ResponseBody public ResponseEntity<?> hire(@RequestBody HireDTO dto) {
        Boolean hirerd = applicantService.hire(dto);
        if(hirerd) {
            return new ResponseEntity<>("Successful hired!", HttpStatus.OK);
        }

        return new ResponseEntity<>("Not hired.", HttpStatus.BAD_REQUEST);
    }

}
