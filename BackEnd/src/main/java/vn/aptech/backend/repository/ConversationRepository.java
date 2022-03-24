package vn.aptech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aptech.backend.entity.Conversation;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    List<Conversation> findByUserOneIdOrUserTwoId(Long userOneId, Long userTwoId);

    List<Conversation> findByUserOneId(Long userOneId);
}
