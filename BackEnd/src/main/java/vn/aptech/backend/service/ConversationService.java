package vn.aptech.backend.service;

import org.springframework.http.ResponseEntity;
import vn.aptech.backend.dto.request.message.MessageCreateRequest;

public interface ConversationService {
    ResponseEntity<?> fillAllConversations();

    ResponseEntity<?> create(MessageCreateRequest request);

    ResponseEntity<?> responseMessage(long conversationId);

    ResponseEntity<?> findMessagesByConversationId(long id);
}
