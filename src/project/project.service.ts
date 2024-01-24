import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { Page } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { User } from 'src/auth/schemas/user.schema';
import { Session } from 'src/analytics/schemas/session.schema';

@Injectable()
export class ProjectService {

  constructor(@InjectModel(Project.name) private projectModel:Model<Project>,
    @InjectModel(Page.name) private pageModel: Model<Page>){}

  createproject(createProjectDto: CreateProjectDto,user:User) {
    Object.assign(createProjectDto,{user:user._id})

    const result=new this.projectModel(createProjectDto);
    return result.save();
  }

  findAllproject() {
    return this.projectModel.find();
  }

  async findOneproject(id: string,user:User) {
     const projectUser= await this.projectModel.findById(id);
       if(JSON.stringify(projectUser.user)===JSON.stringify(user._id))
        return this.projectModel.findById(id);
      else
        return "You are Not allowed to view the project"
  
  }

  updateproject(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  removeproject(id: number) {
    return `This action removes a #${id} project`;
  }
}



@Injectable()
export class PageService {

  constructor(@InjectModel(Project.name) private projectModel:Model<Project>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Session.name) private sessionModel:Model<Session>){}

  async createPage({projectId,...page_name}: CreatePageDto) {
    const findProject = await this.projectModel.findById(projectId);
    if (!findProject) throw new HttpException('project Not Found', 404);
    //this.check(findProject);
    const newPage = new this.pageModel({...page_name, projectId: projectId });
    const savedPage = await newPage.save();
    
    return savedPage;
  }

  findAllpage() {
    const start_time=new Date();
    const end_time=new Date();
  
    return this.pageModel.find();
  }

  async findOnePage(id:string,user:User){
    const page=await this.pageModel.findById(id);
    if(!page)throw new HttpException('page Not Found', 404);
    const projectId=page.projectId;
    const project=await this.projectModel.findById(projectId);
    const session =await this.sessionModel.create({
      user:user._id,
      project:projectId,
      page:id,
      start_time:new Date(),
      device:"device_1"
    })

    console.log(session)
  if(JSON.stringify(project.user)== JSON.stringify(user._id) )
    return page;
    else{
      return "you cannot visit the unassiged projects"
    }
  }

  async endPageSession(id:string){
    const session= await this.sessionModel.findById(id);
    const start : any=new Date(session.start_time);
    const end:any=new Date();
    // Calculate time difference in milliseconds
    const timeDifference   = end - start;

    //Convert milliseconds to human-readable format
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    //console.log("h  "+hours+"m   "+minutes+"s  "+seconds);
    const timespent=`${hours}:${minutes}"${seconds}`
    const result= await this.sessionModel.findByIdAndUpdate(id ,{end_time:end,timeSpent:timespent});
    return result;
  }
  

}