import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProfileRepository } from 'src/profile/repository';
import { RoleRepository } from 'src/role/role.repository';
import { UserRoleRepository } from 'src/user-role/repository';
import { UserRepository } from 'src/user/user.repository';

export enum VIEWS {
  USER_ROLES = 'user-roles',
  USER_PROFILE = 'user-profile',
}

@Injectable()
export class UserAssociationRepository implements OnModuleInit {
  private views = new Map();

  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  onModuleInit() {
    this.setView();
    this.setup();
  }

  setup() {
    this.userRepository
      .getModel()
      .belongsToMany(this.roleRepository.getModel(), {
        through: this.userRoleRepository.getModel(),
      });

    this.roleRepository
      .getModel()
      .belongsToMany(this.userRepository.getModel(), {
        through: this.userRoleRepository.getModel(),
      });

    this.profileRepository
      .getModel()
      .belongsTo(this.userRepository.getModel(), { foreignKey: 'userId' });

    this.userRepository
      .getModel()
      .hasOne(this.profileRepository.getModel(), { foreignKey: 'userId' });
  }

  setView() {
    this.views.set(VIEWS.USER_ROLES, [
      {
        model: this.roleRepository.getModel(),
      },
    ]);

    this.views.set(VIEWS.USER_PROFILE, [
      {
        model: this.profileRepository.getModel(),
      },
    ]);
  }

  getView(view: VIEWS) {
    return this.views.get(view) || [];
  }

  getRepoAndInclude(view: VIEWS) {
    if (view === VIEWS.USER_ROLES) {
      return {
        repo: this.userRepository,
        include: this.getView(view),
      };
    }

    if (view === VIEWS.USER_PROFILE) {
      return {
        repo: this.userRepository,
        include: this.getView(view),
      };
    }
  }
}
