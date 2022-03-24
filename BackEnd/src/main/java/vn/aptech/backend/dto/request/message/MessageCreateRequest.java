package vn.aptech.backend.dto.request.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageCreateRequest {
    @NotNull
    private Long conversationId;
    @NotNull
    @NotBlank
    private String message;
}
