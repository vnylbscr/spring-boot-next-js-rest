package com.backend.backend.repository;

import java.util.ArrayList;
import java.util.List;

import com.backend.backend.model.NoteEntity;
import com.backend.backend.util.WithPagination;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class CustomNoteRepositoryImpl implements CustomNoteRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public WithPagination<NoteEntity> getAllByUserId(String userId, Boolean completed, Boolean isDescending,
            String sortBy, int page,
            int size) {
        // create query with pagination and WithPagination class fields in the
        // response

        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        if (completed != null) {
            query.addCriteria(Criteria.where("completed").is(completed));
        }

        // pagination fields
        int totalCount = (int) mongoTemplate.count(query, NoteEntity.class);

        if (totalCount == 0) {
            WithPagination<NoteEntity> result = new WithPagination<>();
            result.setItems(new ArrayList<>());
            result.setCurrentPage(page);
            result.setHasNext(false);
            result.setHasPrevious(false);
            result.setPage(page);
            result.setSize(size);
            result.setTotalPages(1);
            result.setTotalCount(totalCount);
            return result;
        }

        if (page > totalCount) {
            throw new IllegalArgumentException("Page number is greater than total count");
        }

        int currentPage = page;
        int totalPages = (int) Math.ceil(totalCount / size) + 1;
        boolean hasNext = false;
        boolean hasPrevious = false;

        if (currentPage > totalPages) {
            throw new IllegalArgumentException("Page number is greater than total count");
        }

        if (page * size < totalCount) {
            hasNext = true;
        }
        if (page > 1) {
            hasPrevious = true;
        }

        query.skip((page - 1) * size).limit(size);

        // create sort
        Sort sort = null;
        if (isDescending) {
            sort = Sort.by(Direction.DESC, sortBy);
        } else {
            sort = Sort.by(Direction.ASC, sortBy);
        }
        query.with(sort);

        // execute query
        List<NoteEntity> notes = mongoTemplate.find(query, NoteEntity.class);

        // create response object
        WithPagination<NoteEntity> response = new WithPagination<>();
        response.setItems(notes);
        response.setPage(currentPage);
        response.setSize(size);
        response.setTotalCount(totalCount);
        response.setHasNext(hasNext);
        response.setHasPrevious(hasPrevious);
        response.setTotalPages(totalPages);
        response.setCurrentPage(currentPage);

        return response;
    }

    @Override
    public List<NoteEntity> searchNote(String search, String userId) {
        Query query = new Query();
        List<Criteria> criterias = new ArrayList<>();
        if (search != null && !search.isEmpty()) {
            criterias.add(Criteria.where("title").regex(search, "i"));
            criterias.add(Criteria.where("text").regex(search, "i"));
        }
        query.addCriteria(new Criteria().orOperator(criterias.toArray(new Criteria[criterias.size()])));
        query.addCriteria(Criteria.where("userId").is(userId));
        List<NoteEntity> notes = mongoTemplate.find(query, NoteEntity.class);
        return notes;
    }

}