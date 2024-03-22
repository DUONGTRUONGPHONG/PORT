<script setup lang="ts">
import * as cheerio from 'cheerio';
import axios from 'axios';
import * as fs from 'fs';
import { ref } from 'vue';

const list_left=ref<any[]>([]);
const list_right=ref<any[]>([]);
const activeTab = ref('result');
const activeButton = ref('result');
const fetchData = async () => {
    try {
        const response = await axios.get('https://dantri.com.vn/the-thao/lich-thi-dau.htm');
        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            
            // data_right.logo = $('.tab-main .tab-container .tab-option img').attr('src')
            // data_right.name = $('.tab-main .tab-container .tab-option h2').text()
            let data_navigation_left: { name: string, logo: any }[] = []
            $('.leagues-list_left').each((index: number, el: cheerio.Element) => {
                $(el).find('.names-container').each((index: number, subEl: cheerio.Element) => {
                    const logo = $(subEl).find('.names-img img').attr('src');
                    const name = $(subEl).find('h3').text();
                    data_navigation_left.push({ name, logo });
                    data_navigation_left=list_left.value
                });
                
            });
            

            // const result:any  = $('.leagues-list_right').find('.tab-main')
            // console.log(result)
            let data_right: { logo:any,name:string,tab_result:any[],tab_history:any[],tab_rank:any[],tab_Option:any[] }[] = []
            $('.leagues-list_right').find('.tab-main').each((index: number, el: cheerio.Element) => {
                let tabResults:any[] = []
                let tabSchedule:any[] = []
                let tabRank:any[] = []
                let tabOption:any[] = []
                const logo = $(el).find('.tab-container .tab-option img').attr('src')
                const name = $(el).find('.tab-container .tab-option h2').text()

                //add result
                $(el).find('.tab-container [id^="tab-score-"] .tab-title').each((subIndex: number, subE: cheerio.Element) => {
                    let tabTitle: Partial<{
                    round: string,
                    a: string,
                }> = {}
                    const round = $(subE).find('.round').text()
                    const a = $(subE).find('a').text()
                     // Cập nhật giá trị cho tabContent
                     tabTitle.round = round;
                     tabTitle.a = a;
                     tabOption.push(tabTitle)
                    
                });

                $(el).find('.tab-container [id^="tab-score-"] .tab-content .tab-detail').each((subIndex: number, subEl: cheerio.Element) => {
                    let tabContent: Partial<{
                    team_home: string,
                    logo_team_home: string,
                    score_home: string,
                    team_away: string,
                    logo_team_away: string,
                    score_away: string,
                    schedule_match: string
                }> = {}
                    const team_home_logo = $(subEl).find('.tab-detail_left .tab-detail_home .team .team-info_left img').attr('src')
                    const team_home_name = $(subEl).find('.tab-detail_left .tab-detail_home .team .team-info_left .team-name').text()
                    const team_home_score = $(subEl).find('.tab-detail_left .tab-detail_home .team .team-score strong').text()
                    const team_away_logo = $(subEl).find('.tab-detail_left .tab-detail_away .team .team-info_left img').attr('src')
                    const team_away_name = $(subEl).find('.tab-detail_left .tab-detail_away .team .team-info_left .team-name').text()
                    const team_away_score = $(subEl).find('.tab-detail_left .tab-detail_away .team .team-score strong').text()
                    const schedule = $(el).find('.tab-detail_end .time_end').text()
                     // Cập nhật giá trị cho tabContent
                    tabContent.team_home = team_home_name;
                    tabContent.logo_team_home = team_home_logo;
                    tabContent.score_home = team_home_score;
                    tabContent.team_away = team_away_name;
                    tabContent.logo_team_away = team_away_logo;
                    tabContent.score_away = team_away_score;
                    tabContent.schedule_match = schedule;

                    tabResults.push(tabContent)
                    
                });
                //add schedule
                $(el).find('.tab-container [id^="tab-schedule-"] .tab-content .tab-detail').each((subIndex: number, subEl: cheerio.Element) => {
                    let tabContent: Partial<{
                    team_home: string,
                    logo_team_home: string,
                    score_home: string,
                    team_away: string,
                    logo_team_away: string,
                    score_away: string,
                    schedule_match: string
                }> = {}
                    const team_home_logo = $(subEl).find('.tab-detail_left .tab-detail_home .team .team-info_left img').attr('src')
                    const team_home_name = $(subEl).find('.tab-detail_left .tab-detail_home .team .team-info_left .team-name').text()
                    const team_home_score = $(subEl).find('.tab-detail_left .tab-detail_home .team .team-score strong').text()
                    const team_away_logo = $(subEl).find('.tab-detail_left .tab-detail_away .team .team-info_left img').attr('src')
                    const team_away_name = $(subEl).find('.tab-detail_left .tab-detail_away .team .team-info_left .team-name').text()
                    const team_away_score = $(subEl).find('.tab-detail_left .tab-detail_away .team .team-score strong').text()
                    const schedule = $(el).find('.tab-detail_end .time_end').text()
                     // Cập nhật giá trị cho tabContent
                    tabContent.team_home = team_home_name;
                    tabContent.logo_team_home = team_home_logo;
                    tabContent.score_home = team_home_score;
                    tabContent.team_away = team_away_name;
                    tabContent.logo_team_away = team_away_logo;
                    tabContent.score_away = team_away_score;
                    tabContent.schedule_match = schedule;

                    tabSchedule.push(tabContent)
                    
                });
                //add rank
                $(el).find('.tab-container [id^="tab-rank-"] .rank-container .rank-main .rank-content').each((subIndex: number, subEl: cheerio.Element) => {
                    let tabContent: Partial<{
                    rank_index: string,
                    team_logo: string,
                    team_name:string,
                    team_match:string,
                    team_diffirence:string,
                    team_point:string
                }> = {}
                    $(subEl).find('.rank-info .rank-info_detail').each((sub2Index,sub2El)=>{
                        const index = $(sub2El).find('.rank-info_index .rank-high').text()
                        const logo = $(sub2El).find('.rank-info_team .info_left img').attr('src')
                        const name = $(sub2El).find('.rank-info_team .info_left .info-name').text()
                        const match = $(sub2El).find('.rank-info_team .info_right .info-match').text()
                        const diffirence = $(sub2El).find('.rank-info_team .info_right .info-difference').text()
                        const point = $(sub2El).find('.rank-info_team .info_right .info-point').text()
                        tabContent.rank_index = index
                        tabContent.team_logo = logo
                        tabContent.team_name = name
                        tabContent.team_match = match
                        tabContent.team_diffirence = diffirence
                        tabContent.team_point = point
                        tabRank.push(tabContent)
                    })
                });
                data_right.push({logo:logo,name:name,tab_result:tabResults,tab_history:tabSchedule,tab_rank: tabRank,tab_Option:tabOption})
                data_right=list_right.value
            });
            
            console.log('data === ',data_right)
        } else {
            console.log('Request failed with status code', response.status);
        }
    } catch (error) {
        console.error(error);
    }
};
const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  activeButton.value = tab;
};

fetchData();


const router = useRouter();
const route = useRoute();
</script>
<template>
    <div class="ml-10 flex justify-center gap-6 mt-6">
      <div class="bg-white w-50 h-100">
        <div v-for="(league, index) in list_left" :key="index" class="names-container selectIdentify flex items-center mb-5">
          <div class="names-img mr-6 ml-2 ">
            <img alt="football-logo" :src="league.logo" class="w-8 h-8">
          </div>
          <h3 class="names-text font-bold">{{ league.name }}</h3>
        </div>
      </div>
      <div>
        <div v-for="(leagues, index) in list_right" :key="index" class="flex flex-col mb-7">
          <div class="bg-white w-210  text-center">
            <div class=" rounded w-200 mx-auto text-center bg-blue-800 mt-6 px-6 pt-2">
              <div id="PremierLeague" class="flex items-center">
                <div class="flex items-center mr-4">
                  <img alt="football-logo" :src="leagues.logo" class="w-8 h-8 rounded-full" />
                <h2 class="text-xl font-semibold ml-3 text-zinc-100">{{ leagues.name }}</h2>
                </div>
                <button
                @click="setActiveTab('result')"
                  id=""
                  class="btn ml-4 focus:outline-none px-4 py-2 rounded-t"
                  data-option="tab-score"
                  data-show="False"
                  :class="activeTab === 'result' ? 'bg-white' : 'text-zinc-100'"
                >
                  Kết quả
                </button>
                <button
                @click="setActiveTab('schedule')"
                  id="btn-tab-schedule-62690dc2fd428ea497587c09"
                  class="btn ml-4 focus:outline-none px-4 py-2 rounded-t"
                  data-option="tab-schedule"
                  data-show="False"
                  :class="activeTab === 'schedule' ? 'bg-white' : 'text-zinc-100'"
                >
                  Lịch thi đấu
                </button>
                <button
                @click="setActiveTab('rank')"
                  id="btn-tab-rank-62690dc2fd428ea497587c09"
                  class="btn ml-4 focus:outline-none px-4 py-2 rounded-t"
                  data-option="tab-rank"
                  data-show="False"
                  :class="activeTab === 'rank' ? 'bg-white' : 'text-zinc-100'"

                >
                  Bảng xếp hạng
                </button>
              </div>
            </div>
            <div class="w-200 mx-auto text-center">
              <div v-for="(result, item) in leagues.tab_Option" :key="item" class="tab-title flex items-center justify-between rounded mt-4  ">
                <div class="round">{{ result.round }}</div>
                <a href="/the-thao/lich-thi-dau/giai-dau/premier-league-62690dc2fd428ea497587c09.htm?tab=tab-score" class="btn-show_all-62690dc2fd428ea497587c09">
                  {{ result.a }}
                  <svg width="8" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"> </svg>
                </a>
              </div>

              <div v-if="activeTab === 'result'" class="grid grid-cols-2 gap-4 mb-5">
                <div v-for="(result1, item1) in leagues.tab_result" :key="item1" class="tab-content h-25 border border-gray-300 rounded w-100 mt-2  ">
                  <a class="tab-detail" href="/the-thao/lich-thi-dau/tran-dau/manchester-city-vs-brentford-64b0c95a1baabd67f8ccc566.htm">
                    <div class="w-60 mx-auto">
                      <div class="tab-detail_left flex items-center justify-between mt-3">
                        <div class="tab-detail_home flex items-center ml-3">
                          <img :src="result1.logo_team_away" alt="football-logo" class="w-8 h-8 rounded-full" />
                          <div class="team-name ml-2">{{ result1.team_away }}</div>
                        </div>
                        <div class="team-score">
                          <strong class="">{{ result1.score_away}}</strong>
                        </div>
                      </div>
                      <div class="tab-detail_away flex items-center justify-between mt-2 ml-3  ">
                        <div class="team flex items-center ">
                          <img :src="result1.logo_team_home" class="w-8 h-8 rounded-full" />
                          <div class="team-name ml-2">{{result1.team_home}}</div>
                        </div>
                        <div class="team-score">
                          <strong class="">{{ result1.score_home}}</strong>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div v-if="activeTab === 'schedule'" :class="{ 'active': activeButton === 'schedule' }" class="grid grid-cols-2 gap-4 mb-5">
                <div v-for="(result1, item1) in leagues.tab_history" :key="item1" class="tab-content h-25 border border-gray-300 rounded w-100 mt-2  ">
                  <a class="tab-detail" href="/the-thao/lich-thi-dau/tran-dau/manchester-city-vs-brentford-64b0c95a1baabd67f8ccc566.htm">
                    <div class="w-60 mx-auto">
                      <div class="tab-detail_left flex items-center justify-between mt-3">
                        <div class="tab-detail_home flex items-center ml-3">
                          <img :src="result1.logo_team_away" alt="football-logo" class="w-8 h-8 rounded-full" />
                          <div class="team-name ml-2">{{ result1.team_away }}</div>
                        </div>
                        <div class="team-score">
                          <strong class="">{{ result1.score_away}}</strong>
                        </div>
                      </div>
                      <div class="tab-detail_away flex items-center justify-between mt-2 ml-3  ">
                        <div class="team flex items-center ">
                          <img :src="result1.logo_team_home" class="w-8 h-8 rounded-full" />
                          <div class="team-name ml-2">{{result1.team_home}}</div>
                        </div>
                        <div class="team-score">
                          <strong class="">{{ result1.score_home}}</strong>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div v-if="activeTab === 'rank'" :class="{ 'active': activeButton === 'rank' }" class="grid grid-cols-2 gap-4 mb-5">
                <div v-for="(result1, item1) in leagues.tab_rank" :key="item1" class="tab-content h-25 border border-gray-300 rounded w-100 mt-2  ">
                  <div class="rank-title flex items-center justify-between">
                    <div class="title-left">Thứ hạng</div>
                    <div class="title-right flex">
                      <p class="mr-4">Trận</p>
                      <p class="mr-4">Hiệu số</p>
                      <p>Điểm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</template>




