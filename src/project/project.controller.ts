import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PageService, ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard())
  createproject(@Body() createProjectDto: CreateProjectDto,@Req() req) {
    return this.projectService.createproject(createProjectDto,req.user);
  }

  @Get()
  findAllproject() {
    return this.projectService.findAllproject();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOneproject(@Param('id') id: string,@Req() req) {
    return this.projectService.findOneproject(id,req.user);
  }

  @Patch(':id')
  updateproject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.updateproject(+id, updateProjectDto);
  }

  @Delete(':id')
  removeproject(@Param('id') id: string) {
    return this.projectService.removeproject(+id);
  }
}



@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  createpage(@Body() createPageDto: CreatePageDto) {
    return this.pageService.createPage(createPageDto);
  }

  @Get()
  findAllpage() {
    return this.pageService.findAllpage();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  findOnePage(@Param('id') id:string,@Req() req){
    return this.pageService.findOnePage(id,req.user);
  }

  @Get('/endSession/:id')
  endPageSession(@Param('id') id : string){
    return this.pageService.endPageSession(id);
  }

}