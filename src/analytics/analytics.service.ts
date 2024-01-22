import { Injectable } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { Session } from './schemas/session.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';


@Injectable()
export class AnalyticsService {

  constructor(@InjectModel(Session.name) private sessionModel:Model<Session>,@InjectConnection() private connection : Connection){}


  async create(createAnalyticsDto: CreateAnalyticsDto): Promise<Session> {
    //console.log(createAnalyticsDto);
     try{
      //console.log(createAnalyticsDto);
    const data= new  this.sessionModel(createAnalyticsDto);
    console.log(data)
    //await data.save();
    //console.log(newUser);
      return data;

      

    }    //return this.sessionModel.create(createAnalyticsDto);
    catch(err){
      console.log(err)
    }
  }

  findAll() {
    return this.sessionModel.find();
  }


  async getActiveUsers(){
    try {
      const result = await this.sessionModel.aggregate([
        {
          $group: {
            _id: {
              start_time: '$start_time',
              page: '$page',
              project:'$project' 
         
            },
            uniqueUsers: { $addToSet: '$user' },
          },
        },
      ]);
      return result;
    }
    catch(err){
      console.log(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }

  update(id: number, updateAnalyticsDto: UpdateAnalyticsDto) {
    return `This action updates a #${id} analytics`;
  }

  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }
}
