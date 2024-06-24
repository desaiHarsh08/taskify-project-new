package com.taskify.models;

import com.taskify.constants.ModelConstants;
import com.taskify.constants.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = ModelConstants.ROLE_TABLE)
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RoleModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roleType = Role.OPERATOR.name();

    @ManyToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "user_id_fk")
    private UserModel user;

}
