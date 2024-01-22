import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { Page } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class ProjectService {

  constructor(@InjectModel(Project.name) private projectModel:Model<Project>,
    @InjectModel(Page.name)
    private pageModel: Model<Page>){}

  create(createProjectDto: CreateProjectDto) {
    const result=this.projectModel.create(createProjectDto);
    return result;
  }

  findAll() {
    return this.projectModel.find().populate(['page']);
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}



@Injectable()
export class PageService {

  constructor(@InjectModel(Project.name) private projectModel:Model<Project>,
    @InjectModel(Page.name)
    private pageModel: Model<Page>){}

  async createPage({projectId,...page_name}: CreatePageDto) {
    const findProject = await this.projectModel.findById(projectId);
    if (!findProject) throw new HttpException('User Not Found', 404);
    const newPage = new this.pageModel({ ...page_name, projectId: projectId });
    const savedPage = await newPage.save();
    await findProject.updateOne({
      $push: {
        page: savedPage._id,
      },
    });
    return savedPage;
  }

  findAll() {
    return this.pageModel.find();
  }
}