package vn.aptech.backend.dto.response.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.aptech.backend.dto.MessageDto;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDetailResponse {
    private Long id;
    private String user;
    List<MessageDto> messages;
}
