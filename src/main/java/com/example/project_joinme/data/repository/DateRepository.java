package com.example.project_joinme.data.repository;

import com.example.project_joinme.data.entity.CourseTbl;
import com.example.project_joinme.data.entity.DateTbl;
import com.example.project_joinme.data.entity.UserTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DateRepository extends JpaRepository<DateTbl,Integer> {
    // 올바른 메서드
    @Modifying
    @Query("DELETE FROM DateTbl d WHERE d.dateSender = :sender AND d.dateReceiver = :receiver AND d.course_id = :course")
    void deleteDate(@Param("sender") UserTbl sender,
                    @Param("receiver") UserTbl receiver,
                    @Param("course") CourseTbl course);


    List<DateTbl> findAllByDateSender(UserTbl dateSender);

    List<DateTbl> findAllByDateReceiver(UserTbl dateReceiver);
}
