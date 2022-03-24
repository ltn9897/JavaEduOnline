package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.aptech.backend.annotation.AllRole;
import vn.aptech.backend.dto.request.message.MessageCreateRequest;
import vn.aptech.backend.service.ConversationService;

@RestController
@RequestMapping("/api")
public class ConversationController implements BaseController {

    @Autowired
    private ConversationService service;

    @AllRole
    @GetMapping("/conversations")
    public ResponseEntity<?> getAllConversations() {
        return service.fillAllConversations();
    }

    @AllRole
    @GetMapping("/conversation/{id}")
    public ResponseEntity<?> getConversationById(@PathVariable Long id) {
        return service.findMessagesByConversationId(id);
    }

    @AllRole
    @PostMapping("/message/create")
    public ResponseEntity<?> createMessage(@Validated @RequestBody MessageCreateRequest request) {
        return service.create(request);
    }

    @AllRole
    @PostMapping("/message/response")
    public ResponseEntity<?> responseMessage(Long id) {
        return service.responseMessage(id);
    }
}
