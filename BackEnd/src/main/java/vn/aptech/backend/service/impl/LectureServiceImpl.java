package vn.aptech.backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.aptech.backend.dto.LectureDto;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.request.lecture.LectureCreateRequest;
import vn.aptech.backend.dto.request.lecture.LectureUpdateRequest;
import vn.aptech.backend.entity.Lecture;
import vn.aptech.backend.entity.Lesson;
import vn.aptech.backend.repository.LectureRepository;
import vn.aptech.backend.repository.LessonRepository;
import vn.aptech.backend.service.LectureService;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.Date;

@Service
public class LectureServiceImpl implements LectureService {

    @Autowired
    private LectureRepository repository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ResponseEntity<?> findById(long id) {
        Lecture lecture = repository.findByIdAndDeletedDateIsNull(id).orElse(null);
        if (lecture == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LECTURE_NOT_FOUND);
        }
        return new ResponseHandler<>().sendSuccess(mapper.map(lecture, LectureDto.class));
    }

    @Transactional
    @Override
    public ResponseEntity<?> create(LectureCreateRequest request) {
        Lesson lesson = lessonRepository.findByIdAndDeletedDateIsNull(request.getLessonId()).orElse(null);
        if (lesson == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LESSON_NOT_FOUND);
        }
        Lecture lecture = mapper.map(request, Lecture.class);
        lecture.setLesson(lesson);
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(lecture), LectureDto.class));
    }

    @Transactional
    @Override
    public ResponseEntity<?> update(LectureUpdateRequest request) {
        Lecture lecture = repository.findByIdAndDeletedDateIsNull(request.getId()).orElse(null);
        if (lecture == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LECTURE_NOT_FOUND);
        }
        Lesson lesson = lessonRepository.findByIdAndDeletedDateIsNull(request.getLessonId()).orElse(null);
        if (lesson == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LESSON_NOT_FOUND);
        }
        if (lecture.getLesson() != lesson) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LECTURE_NOT_IN_LESSON);
        }
        lecture.setTitle(request.getTitle());
        lecture.setSort(request.getSort());
        lecture.setVideoUrl(request.getVideoUrl());
        lecture.setVideoDuration(request.getVideoDuration());
        lecture.setPreview(request.isPreview());
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(lecture), LectureDto.class));
    }

    @Transactional
    @Override
    public ResponseEntity<?> delete(long id) {
        Lecture lecture = repository.findByIdAndDeletedDateIsNull(id).orElse(null);
        if (lecture == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LECTURE_NOT_FOUND);
        }
        lecture.setDeletedDate(new Date());
        return new ResponseHandler<>().sendSuccess("Delete success");
    }

}
