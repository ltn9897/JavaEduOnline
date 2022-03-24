package vn.aptech.backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.aptech.backend.dto.MessageDto;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.request.message.MessageCreateRequest;
import vn.aptech.backend.dto.response.message.ConversationDetailResponse;
import vn.aptech.backend.dto.response.message.ConversationResponse;
import vn.aptech.backend.entity.AppUser;
import vn.aptech.backend.entity.Conversation;
import vn.aptech.backend.entity.Messages;
import vn.aptech.backend.repository.ConversationRepository;
import vn.aptech.backend.repository.MessagesRepository;
import vn.aptech.backend.repository.UserRepository;
import vn.aptech.backend.service.ConversationService;
import vn.aptech.backend.utils.SecurityUtils;
import vn.aptech.backend.utils.enums.RoleEnums;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationServiceImpl implements ConversationService {

    @Autowired
    private MessagesRepository repository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> fillAllConversations() {
        AppUser user = securityUtils.getPrincipal();
        List<Conversation> conversations = new ArrayList<>();
        switch (user.getRole().getName()){
            case "ROLE_USER":
                conversationRepository.findByUserOneId(user.getId());
                break;
            case "ROLE_ADMIN" :
                conversations = conversationRepository.findByUserOneIdOrUserTwoId(user.getId(), user.getId());
                break;
        }

        if (user.getRole().getName().equals(RoleEnums.ROLE_USER.name())) {
            if (conversations.size() == 0) {
                Conversation conversation = new Conversation();
                conversation.setUserOne(user);
                conversation.setUserTwo(userRepository.findByIdAndDeletedDateIsNull(1L).get());
                conversations.add(conversationRepository.save(conversation));
            }
        }

        List<ConversationResponse> responses = conversations.stream().map(conversation -> {
            ConversationResponse response = new ConversationResponse();
            response = mapper.map(conversation, ConversationResponse.class);
            if (user.getRole().getName().equals(RoleEnums.ROLE_USER.name())) {
                response.setUser(conversation.getUserTwo().getFullname());
            } else {
                response.setUser(conversation.getUserOne().getFullname());
            }
            if (conversation.getMessages()!= null && conversation.getMessages().size() > 0) {
                response.setLastMessage(conversation.getMessages().get(conversation.getMessages().size() - 1).getMessage());
            }
            return response;
        }).collect(Collectors.toList());
        return new ResponseHandler<>().sendSuccess(responses);
    }

    @Override
    public ResponseEntity<?> create(MessageCreateRequest request) {
        AppUser user = securityUtils.getPrincipal();
        Conversation conversation = conversationRepository.findById(request.getConversationId()).orElse(null);
        if (conversation == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.CONVERSATION_NOT_FOUND);
        }
        List<Messages> messagesUserOther = conversation.getMessages().stream()
                .filter(messages -> !messages.getUser().getId().equals(user.getId()))
                .collect(Collectors.toList());
        messagesUserOther.forEach(messageUserOther -> messageUserOther.setResponsed(true));
        repository.saveAll(messagesUserOther);
        Messages messages = mapper.map(request, Messages.class);
        messages.setConversation(conversation);
        messages.setUser(user);
        repository.save(messages);
        return new ResponseHandler<>().sendSuccess("Message has been sent");
    }

    @Override
    public ResponseEntity<?> responseMessage(long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
        if (conversation == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.CONVERSATION_NOT_FOUND);
        }
        conversation.getMessages().forEach(messages -> messages.setResponsed(true));
        conversationRepository.save(conversation);
        return new ResponseHandler<>().sendSuccess("Responsed");
    }

    @Override
    public ResponseEntity<?> findMessagesByConversationId(long id) {
        AppUser user = securityUtils.getPrincipal();
        Conversation conversation = conversationRepository.findById(id).orElse(null);
        if (conversation == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.CONVERSATION_NOT_FOUND);
        }
        ConversationDetailResponse response = new ConversationDetailResponse();
        response = mapper.map(conversation, ConversationDetailResponse.class);
        if (user.getRole().getName().equals(RoleEnums.ROLE_USER.name())) {
            response.setUser(conversation.getUserTwo().getUsername());
        } else {
            response.setUser(conversation.getUserOne().getUsername());
        }
        List<MessageDto> messages = conversation.getMessages().stream().map(message -> {
            MessageDto messageDto = new MessageDto();
            messageDto = mapper.map(message, MessageDto.class);
            messageDto.setUsername(message.getUser().getUsername());
            return messageDto;
        }).collect(Collectors.toList());
        response.setMessages(messages);
        return new ResponseHandler<>().sendSuccess(response);
    }
}
