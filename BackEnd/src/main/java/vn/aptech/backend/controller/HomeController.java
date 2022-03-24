package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.aptech.backend.annotation.Admin;
import vn.aptech.backend.service.HomeService;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
public class HomeController implements BaseController {

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    private static final String BASE_URL = "http://localhost:8080/";

    @Autowired
    private HomeService service;

    @Admin
    @GetMapping("/admin/dashboard")
    public ResponseEntity<?> getDashboardAdmin() {
        return service.getDashboardAdmin();
    }

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public String create(@RequestParam MultipartFile image) throws IOException {
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
        }
        Path file = CURRENT_FOLDER.resolve(staticPath)
                .resolve(imagePath).resolve(image.getOriginalFilename());
        try (OutputStream os = Files.newOutputStream(file)) {
            os.write(image.getBytes());
        }
        return BASE_URL + imagePath.resolve(image.getOriginalFilename()).toString();
    }
}
