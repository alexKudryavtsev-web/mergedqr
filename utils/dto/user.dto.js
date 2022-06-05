class UserDto {
  userId;
  email;
  name;
  description;
  isActivated;
  createdAt;

  constructor(model) {
    this.userId = model._id;
    this.email = model.email;
    this.name = model.name;
    this.description = model.description;
    this.isActivated = model.isActivated;
    this.createdAt = model.createdAt;
  }
}

export default UserDto;
