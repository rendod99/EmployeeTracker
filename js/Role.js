class Role {
    constructor(firstName, lastName, roleId, managerId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;

    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getRoleId() {
        return this.roleId;
    }

    getManagerId() {
        return this.managerId;
    }


}

module.exports = Role;